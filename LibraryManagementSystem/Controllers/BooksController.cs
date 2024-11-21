using LibraryManagementSystem.Data;
using LibraryManagementSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly LibraryContext _context;

        // Constructor that injects the LibraryContext for database access
        public BooksController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            // Fetch all books from the database and return as a list
            return await _context.Books.ToListAsync();
        }

        // GET: api/Books/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            // Find the book by ID in the database
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                // Return a 404 error if the book is not found
                return NotFound(new { message = $"Book with ID {id} not found." });
            }

            // Return the found book
            return book;
        }

        // POST: api/Books
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            // Validate the book model before adding it to the database
            if (!ModelState.IsValid)
            {
                // Return bad request if the model is not valid
                return BadRequest(ModelState);
            }

            // Add the new book to the database
            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            // Return a 201 response with the location of the new book
            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }

        // PUT: api/Books/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            // Check if the ID in the URL matches the ID in the request body
            if (id != book.Id)
            {
                return BadRequest(new { message = "Book ID in the URL does not match the ID in the payload." });
            }

            // Validate the book model before updating
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the book exists in the database
            var existingBook = await _context.Books.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound(new { message = $"Book with ID {id} not found." });
            }

            // Update the existing book's properties with the new data
            existingBook.Title = book.Title;
            existingBook.Author = book.Author;
            existingBook.Description = book.Description;

            // Save the changes to the database
            await _context.SaveChangesAsync();

            // Return a 204 No Content response to indicate the update was successful
            return NoContent();
        }

        // DELETE: api/Books/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            // Find the book by ID in the database
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                // Return a 404 error if the book is not found
                return NotFound(new { message = $"Book with ID {id} not found." });
            }

            // Remove the book from the database
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            // Return a 204 No Content response to indicate the deletion was successful
            return NoContent();
        }
    }
}
