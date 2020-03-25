using System.Threading.Tasks;
using API.Controllers.Resources;
using Application;
using Application.User;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersController : BaseController
    {
        [AllowAnonymous]
        [HttpGet("conn-test")]
        public ActionResult Test()
        {
            return Ok("OK");
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserResource>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserResource>> Register(Register.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet("current")]
        public async Task<ActionResult<UserResource>> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }

        [HttpGet]
        public async Task<ActionResult<QueryObject<UserResource>>> List([FromQuery] PagingParameterModel pagingModel)
        {
            return await Mediator.Send(new List.Query { Page = pagingModel.PageNumber, Size = pagingModel.PageSize });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{userName}")]
        public async Task<ActionResult<Unit>> Edit(string userName, Edit.Command command)
        {
            command.UserName = userName;
            return await Mediator.Send(command);
        }

        [HttpDelete("{userName}")]
        public async Task<ActionResult<Unit>> Delete(string userName)
        {
            return await Mediator.Send(new Delete.Command { UserName = userName });
        }


    }
}