using API.Controllers.Resources;
using Application;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ActivitiesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<QueryObject<Activity>>> List([FromQuery] PagingParameterModel pagingModel)
        {
            return await Mediator.Send(new List.Query { Page = pagingModel.PageNumber, Size = pagingModel.PageSize });
        }


        [HttpGet("{id}/attend")]
        public async Task<ActionResult<Unit>> Get([FromRoute] Guid Id, [FromRoute] int Seat)
        {
            return await Mediator.Send(new Attend.Command { Id = Id, Seat = Seat });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}
