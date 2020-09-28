using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace MyApp
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class DareYou : ContentPage
    {
        public DareYou()
        {
            var image = ImageSource.FromFile(AddMyCode.OnPlatFLor("wow.png", "wow.png", "Imagess/wow.png"));
            InitializeComponent();
            dareYou.Source = image;
        }

    }
}