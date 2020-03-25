using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using Helpers;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class Create
    {
        public class Command : IRequest
        {
            public string UserName { get; set; }
            public string DisplayName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string Photo { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _context.Users.Where(x => x.Email == request.Email).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });

                if (await _context.Users.Where(x => x.UserName == request.UserName).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new { UserName = "Username already exists" });

                var user = new AppUser
                {
                    UserName = request.UserName,
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    PasswordHash = request.Password.Encrypt(),
                    Photo = request.Photo != null ? Convert.FromBase64String(request.Photo.Substring(22)) : null
                };

                _context.Users.Add(user);
                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
