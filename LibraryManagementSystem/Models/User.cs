using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Models
{
    public class User
    {
        public int Id { get; set; }
        
        public string Username { get; set; } = string.Empty; 
        public string Password { get; set; } = string.Empty; 
        public string Role { get; set; } = string.Empty; 
        

        // Default constructor
        public User() { }

        // You can also add a constructor to directly set these values:
        public User(string username, string password, string role)
        {
            Username = username;
            Password = password;
            Role = role;
        }
    }
}
