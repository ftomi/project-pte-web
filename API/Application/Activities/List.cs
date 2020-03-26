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

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<QueryObject<Activity>>
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

        public class Handler : IRequestHandler<Query, QueryObject<Activity>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<QueryObject<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var page = request.Page ?? 0;
                var size = request.Size ?? 20;
                var data = await _context.Activities.Skip(page * size).Take(size).ToListAsync();

                var count = _context.ClassRooms.Count();
                return new QueryObject<Activity>
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
