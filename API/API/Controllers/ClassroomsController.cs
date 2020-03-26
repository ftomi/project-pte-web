using API.Controllers.Resources;
using Application;
using Application.Room;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ClassroomsController: BaseController
    {
        [HttpGet]
        public async Task<ActionResult<QueryObject<ClassRoom>>> List([FromQuery] PagingParameterModel pagingModel)
        {
            return await Mediator.Send(new List.Query { Page = pagingModel.PageNumber, Size = pagingModel.PageSize });
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ClassRoom>> Get([FromRoute] Guid Id)
        {
            return await Mediator.Send(new Get.Query { Id = Id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}
