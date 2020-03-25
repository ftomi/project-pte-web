using Application.Errors;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class Edit
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
                //RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == request.UserName);

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not found" });

                user.DisplayName = request.DisplayName ?? user.DisplayName;
                user.Photo = Convert.FromBase64String(request.Photo.Substring(22));
                var success = await _context.SaveChangesAsync() > 0;

                if (success) 
                    return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }

}
