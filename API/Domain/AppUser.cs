using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Domain
{
    public class AppUser
    {
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string UserType { get; set; }
        //public virtual ICollection<Todo> Todos { get; set; }
        public byte[]? Photo { get; set; }
    }
}
