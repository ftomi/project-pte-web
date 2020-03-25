using System.Linq;
using Application.User;
using AutoMapper;
using Domain;

namespace Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserResource, AppUser>();
            CreateMap<AppUser, UserResource>();
            CreateMap<User, AppUser>();
            CreateMap<AppUser, User>();
        }
    }
}
