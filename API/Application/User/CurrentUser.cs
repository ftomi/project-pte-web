using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<UserResource> { }

        public class Handler : IRequestHandler<Query, UserResource>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IHostingEnvironment _hostingEnvironment;
            private readonly IJwtGenerator _jwtGenerator;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper, IHostingEnvironment hostingEnvironment, IJwtGenerator jwtGenerator)
            {
                _jwtGenerator = jwtGenerator;
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
                _hostingEnvironment = hostingEnvironment;
            }

            public async Task<UserResource> Handle(Query request, CancellationToken cancellationToken)
            {
                var env = _hostingEnvironment.EnvironmentName;
                var root = env == "Development" ? _hostingEnvironment.ContentRootPath + "\\images" : _hostingEnvironment.WebRootPath;
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
                var ret = _mapper.Map<AppUser, UserResource>(user);
                ret.Token = _jwtGenerator.CreateToken(new AppUser { UserName = user.UserName });
                string path = $"{root}\\profile.png";
                byte[] b = System.IO.File.ReadAllBytes(path);
                ret.Photo = "data:image/png;base64," + (user.Photo == null ? Convert.ToBase64String(b) : Convert.ToBase64String(user.Photo));
                return ret;
            }
        }
    }
}