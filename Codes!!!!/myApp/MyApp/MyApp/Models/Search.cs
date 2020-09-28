using System;
using System.Collections.Generic;
using System.Text;

namespace MyApp.Models
{
  public  class Search
    {
		public int Id { get; set; }
		public string Name { get; set; }
		public DateTime Date { get; set; } 
		public string Image { get; set; }
		
		public string Age
		{
			get
			{
				TimeSpan timeSpan = DateTime.Now - Date;
				int age =(int) timeSpan.TotalDays;
				return Convert.ToString(String.Format("{0}",age/365 ));
			}
		}

	}
}

