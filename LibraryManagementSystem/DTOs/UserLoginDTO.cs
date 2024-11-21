using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.DTOs
{
    public class UserLoginDTO
    {
        public string Username { get; set; } = string.Empty; // Initialize with default value
        public string Password { get; set; } = string.Empty; // Initialize with default value

        public UserLoginDTO() { }

        public UserLoginDTO(string username, string password)
        {
            Username = username;
            Password = password;
        }
    }
}

