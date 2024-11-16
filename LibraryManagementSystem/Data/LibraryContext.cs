namespace LibraryManagementSystem.Data
{
    using Microsoft.EntityFrameworkCore;
    using LibraryManagementSystem.Models;  

    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options) { }

        public DbSet<Book> Books { get; set; }
    }
}
