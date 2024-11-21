[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly LibraryContext _context;
    private readonly IConfiguration _configuration;

    // Constructor to inject the necessary dependencies (context and configuration)
    public AuthController(LibraryContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    // POST: api/Auth/register
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterDTO userDTO)
    {
        // Validate input fields: check if username, password, and confirm password are not empty
        if (string.IsNullOrWhiteSpace(userDTO.Password) ||
            string.IsNullOrWhiteSpace(userDTO.Username) ||
            string.IsNullOrWhiteSpace(userDTO.ConfirmPassword))
        {
            return BadRequest(new { message = "Username, Password, and Confirm Password cannot be empty." });
        }

        // Check if the password and confirm password match
        if (userDTO.Password != userDTO.ConfirmPassword)
        {
            return BadRequest(new { message = "Password and Confirm Password do not match." });
        }

        // Check if the username already exists in the database
        if (await _context.Users.AnyAsync(u => u.Username == userDTO.Username))
        {
            return BadRequest(new { message = "Username already exists." });
        }

        // Use PasswordHasher to securely hash the password before storing it
        var passwordHasher = new PasswordHasher<User>();
        var hashedPassword = passwordHasher.HashPassword(new User(), userDTO.Password); // Pass an empty User object to avoid null reference

        // Map the DTO to a User model and save to the database
        var user = new User
        {
            Username = userDTO.Username,
            Password = hashedPassword,
            Role = userDTO.Role ?? "User" // Set default role as "User" if no role is provided
        };

        // Add the user to the context and save the changes
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        // Return a success message
        return Ok(new { message = "Registration successful." });
    }

    // POST: api/Auth/login
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDTO userDTO)
    {
        // Validate input: check if username and password are provided
        if (string.IsNullOrWhiteSpace(userDTO.Password) || string.IsNullOrWhiteSpace(userDTO.Username))
        {
            return BadRequest(new { message = "Username and Password cannot be empty." });
        }

        // Retrieve the user from the database by username
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == userDTO.Username);
        if (existingUser == null)
        {
            return Unauthorized(new { message = "Invalid username or password." });
        }

        // Use PasswordHasher to verify the entered password against the stored hashed password
        var passwordHasher = new PasswordHasher<User>();
        var verificationResult = passwordHasher.VerifyHashedPassword(existingUser, existingUser.Password, userDTO.Password);

        if (verificationResult != PasswordVerificationResult.Success)
        {
            return Unauthorized(new { message = "Invalid username or password." });
        }

        // Create JWT claims based on the user data
        var claims = new[] 
        {
            new Claim(ClaimTypes.Name, existingUser.Username),
            new Claim(ClaimTypes.Role, existingUser.Role ?? "User") // Default role to "User" if not provided
        };

        // Generate JWT token
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? string.Empty)); // Make sure Jwt:Key exists in the config
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // Create a new JWT token with the claims, expiration, and signing credentials
        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(1), // Token expires in 1 hour
            signingCredentials: creds);

        // Return the JWT token as a response
        return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
    }
}
