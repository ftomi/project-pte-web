using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Room
{
    public class Get
    {
        public class Query : IRequest<ClassRoom>
        {
            public Guid Id { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, ClassRoom>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ClassRoom> Handle(Query request, CancellationToken cancellationToken)
            {
                var data = await _context.ClassRooms.FindAsync(request.Id);

                return data;

                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}
