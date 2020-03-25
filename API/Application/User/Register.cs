using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using AutoMapper;
using Domain;
using FluentValidation;
using Helpers;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<UserResource>
        {
            public string DisplayName { get; set; }
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string Photo { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();
            }
        }

        public class Handler : IRequestHandler<Command, UserResource>
        {
            private readonly DataContext _context;
            private readonly IJwtGenerator _jwtGenerator;
            public Handler(DataContext context, IJwtGenerator jwtGenerator)
            {
                _jwtGenerator = jwtGenerator;
                _context = context;
            }

            public async Task<UserResource> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _context.Users.Where(x => x.Email == request.Email).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new {Email = "Email already exists"});

                if (await _context.Users.Where(x => x.UserName == request.Username).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new { UserName = "Username already exists"});

                var user = new AppUser
                {
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.Username,
                    PasswordHash = request.Password.Encrypt()
                };

                _context.Users.Add(user);
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return new UserResource
                {
                    DisplayName = user.DisplayName,
                    Token = _jwtGenerator.CreateToken(new AppUser { UserName = user.UserName }),
                    UserName = user.UserName,
                    Email = user.Email,
                    Photo = user.Photo != null ? "data:image/png;base64," + Convert.ToBase64String(user.Photo) : null
                };

                throw new Exception("Problem saving changes");
            }
        }
    }
}