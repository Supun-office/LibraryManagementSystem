using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryManagementSystem.Data;
using LibraryManagementSystem.Models;
using LibraryManagementSystem.DTOs;
using Microsoft.AspNetCore.Identity;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly LibraryContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(LibraryContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    // POST: api/Auth/register
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterDTO userDTO)
    {
        if (string.IsNullOrWhiteSpace(userDTO.Password) ||
            string.IsNullOrWhiteSpace(userDTO.Username) ||
            string.IsNullOrWhiteSpace(userDTO.ConfirmPassword))
        {
            return BadRequest(new { message = "Username, Password, and Confirm Password cannot be empty." });
        }

        if (userDTO.Password != userDTO.ConfirmPassword)
        {
            return BadRequest(new { message = "Password and Confirm Password do not match." });
        }

        if (await _context.Users.AnyAsync(u => u.Username == userDTO.Username))
        {
            return BadRequest(new { message = "Username already exists." });
        }

        // Use PasswordHasher for secure password hashing
        var passwordHasher = new PasswordHasher<User>();
        var hashedPassword = passwordHasher.HashPassword(new User(), userDTO.Password); // Pass an empty User object to avoid null reference

        // Map DTO to User model and save to DB
        var user = new User
        {
            Username = userDTO.Username,
            Password = hashedPassword,
            Role = userDTO.Role ?? "User" // Default role if not provided
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Registration successful." });
    }

    // POST: api/Auth/login
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDTO userDTO)
    {
        if (string.IsNullOrWhiteSpace(userDTO.Password) || string.IsNullOrWhiteSpace(userDTO.Username))
        {
            return BadRequest(new { message = "Username and Password cannot be empty." });
        }

        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == userDTO.Username);
        if (existingUser == null)
        {
            return Unauthorized(new { message = "Invalid username or password." });
        }

        // Use PasswordHasher to verify the entered password against the stored hash
        var passwordHasher = new PasswordHasher<User>();
        var verificationResult = passwordHasher.VerifyHashedPassword(existingUser, existingUser.Password, userDTO.Password);

        if (verificationResult != PasswordVerificationResult.Success)
        {
            return Unauthorized(new { message = "Invalid username or password." });
        }

        
        var claims = new[] 
        {
            new Claim(ClaimTypes.Name, existingUser.Username),
            new Claim(ClaimTypes.Role, existingUser.Role ?? "User") // Use the role or default to "User"
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? string.Empty)); // Ensure that Jwt:Key is not null
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: creds);

        return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
    }
}
