using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using Helpers;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<UserResource>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, UserResource>
        {
            private readonly DataContext _context;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IMapper _mapper;
            private readonly IHostingEnvironment _hostingEnvironment;
            public Handler(DataContext context, IJwtGenerator jwtGenerator, IMapper mapper, IHostingEnvironment hostingEnvironment)
            {
                _jwtGenerator = jwtGenerator;
                _context = context;
                _hostingEnvironment = hostingEnvironment;
            }

            public async Task<UserResource> Handle(Query request, CancellationToken cancellationToken)
            {
                var env = _hostingEnvironment.EnvironmentName;
                var root = env == "Development" ? _hostingEnvironment.ContentRootPath + "\\images" : _hostingEnvironment.WebRootPath;
                var user = await _context.FindAsync<AppUser>(request.Email);

                if (user == null)
                    throw new RestException(HttpStatusCode.Unauthorized);

                if(!request.Password.Validate(user.PasswordHash))
                    throw new RestException(HttpStatusCode.Unauthorized);

                string path = $"{root}\\profile.png";
                byte[] b = System.IO.File.ReadAllBytes(path);
                if (user != null)
                {
                    return new UserResource
                    {
                        DisplayName = user.DisplayName,
                        Token = _jwtGenerator.CreateToken(new AppUser { UserName = user.UserName }),
                        UserName = user.UserName,
                        Email = user.Email,
                        Photo = "data:image/png;base64," + (user.Photo == null  ? Convert.ToBase64String(b) : Convert.ToBase64String(user.Photo) )
                };
                }

                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}