using System;
using System.Collections.Generic;
using System.Text;

namespace Application
{
    public class QueryObject<T>
    {
        public int Page { get; set; }
        public int ItemsCount { get; set; }
        public int ItemsPerPage { get; set; }
        public ICollection<T> Data { get; set; }
    }
}
