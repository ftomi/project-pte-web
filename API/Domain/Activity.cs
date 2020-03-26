using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
   public class Activity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        // TODO: CLASS

        public virtual ICollection<UserActivity> UserActivities { get; set; }
    }
}
