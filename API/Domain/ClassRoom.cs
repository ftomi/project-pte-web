using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class ClassRoom
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int AvailableSeats { get; set; }
    }
}
