using MyApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MyApp
{
    class SearchService
    {

        List<Search> _searches = new List<Search>
        {
            new Search { Image=AddMyCode.OnPlatFLor("ball.png", "ball.png", "Imagess/ball.png"), Id = 1, Name = "daniel", Date = DateTime.Parse("11/24/1996") },
            new Search {Image=AddMyCode.OnPlatFLor("clock.png", "clock.png", "Imagess/ball.png"), Id = 2, Name = "michael", Date = DateTime.Parse("11/24/1995") }
        };
      public  IEnumerable<Search> ResantSearches (string filter = null)
        {
            if (String.IsNullOrWhiteSpace(filter)) return _searches;
            return _searches.Where(s => s.Name.Contains (filter));
        }
        public void DeleteItem(int id)
        {
            _searches.Remove(_searches.Single(s => s.Id == id));
        }
    }
}
