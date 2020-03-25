using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers.Resources
{

    public class PagingParameterModel
    {
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
    }
}
