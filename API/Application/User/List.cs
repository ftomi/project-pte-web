using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Hosting;
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
    public class List
    {
        public class Query : IRequest<QueryObject<UserResource>>
        {
            public int? Page { get; set; }
            public int? Size { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Page).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, QueryObject<UserResource>>
        {
            //private readonly UserManager<AppUser> _userManager;
            //private readonly SignInManager<AppUser> _signInManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IHostingEnvironment _hostingEnvironment;
            public Handler(DataContext context, IJwtGenerator jwtGenerator, IMapper mapper, IHostingEnvironment hostingEnvironment)
            {
                _jwtGenerator = jwtGenerator;
                _context = context;
                _mapper = mapper;
                _hostingEnvironment = hostingEnvironment;
                //_signInManager = signInManager;
                //_userManager = userManager;
            }

            public async Task<QueryObject<UserResource>> Handle(Query request, CancellationToken cancellationToken)
            {
                var env = _hostingEnvironment.EnvironmentName;
                var root = env == "Development" ? _hostingEnvironment.ContentRootPath + "\\images" : _hostingEnvironment.WebRootPath;
                var page = request.Page ?? 0;
                var size = request.Size ?? 20;
                var users = await _context.Users.Skip(page * size).Take(size).ToListAsync();
                var data = _mapper.Map<List<AppUser>, List<UserResource>>(users);

                foreach (var item in data)
                {
                    string path = $"{root}\\profile.png";
                    byte[] b = System.IO.File.ReadAllBytes(path);
                    var img = users.Where(x => x.UserName == item.UserName).FirstOrDefault();
                    item.Photo = "data:image/png;base64," + (img.Photo == null ? Convert.ToBase64String(b) : Convert.ToBase64String(img.Photo));
                }


                var count = _context.Users.Count();
                return new QueryObject<UserResource>
                {
                    ItemsPerPage = size,
                    Data = data,
                    Page = page,
                    ItemsCount = count
                };
           

                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}
