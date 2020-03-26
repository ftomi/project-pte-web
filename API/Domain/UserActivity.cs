using System;

namespace Domain
{
    public class UserActivity
    {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public Guid ActivityId { get; set; }
        public virtual Activity Activity { get; set; }
        public Guid ClassRoomId { get; set; }
        public virtual ClassRoom ClassRoom { get; set; }
        public int Seat { get; set; }
        public DateTime DateJoined { get; set; }
        public bool IsHost { get; set; }
    }
}