using System;
using System.Collections.Generic;
using System.Text;

namespace MyApp.Models
{
   public class ContectGroup:List<Contact>
    {
        public string Title { get; set; }
        public string MiniTitle { get; set; }
        public ContectGroup(string title, IEnumerable<Contact> searches = null)
            : base(searches)
        {
            Title = title;
        }
        public ContectGroup()
        {

        }
    }
}
