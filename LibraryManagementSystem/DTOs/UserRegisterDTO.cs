using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.DTOs
{
    public class UserRegisterDTO
    {
        public string Username { get; set; } = string.Empty; // Initialize with default value
        public string Password { get; set; } = string.Empty; // Initialize with default value
        public string ConfirmPassword { get; set; } = string.Empty; // Initialize with default value
        public string Role { get; set; } = "User"; // Default role, can be modified based on your logic

        public UserRegisterDTO() { }

        // Add constructor for easier initialization if needed
        public UserRegisterDTO(string username, string password, string confirmPassword, string role)
        {
            Username = username;
            Password = password;
            ConfirmPassword = confirmPassword;
            Role = role;
        }
    }
}

