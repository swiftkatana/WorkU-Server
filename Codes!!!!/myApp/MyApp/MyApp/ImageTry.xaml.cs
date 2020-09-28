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
    public partial class ImageTry : ContentPage
    {
        static string[] imagesUri = new string[] { "http://lorempixel.com/1920/1080/city/1", "http://lorempixel.com/1920/1080/sports/7" };
          static string[] images = new string[] { "Imagess/right.png", "Imagess/ball.png" };
        static int index = 0;

        UriImageSource imageSource = new UriImageSource { Uri = new Uri(imagesUri[index]) };
        ImageSource imagefile = ImageSource.FromFile(images[index]);
        public ImageTry()
        {
            InitializeComponent();


            backImages.Source = imagefile;
           

            back.ImageSource = (FileImageSource)ImageSource.FromFile(OnPlatForm("Images.clock", "left", "Imagess/left.png"));
            next.ImageSource = (FileImageSource)ImageSource.FromFile(OnPlatForm("Images.clock", "right", "Imagess/right.png"));
        }
        public static string OnPlatForm( string ios , string android , string UWP)
        {
            if (Device.RuntimePlatform == Device.Android) return android;
            else if (Device.RuntimePlatform == Device.UWP) return UWP;
            else if (Device.RuntimePlatform == Device.iOS) return ios;
            else return null;
        }

       //  var imageSource = new UriImageSource { Uri = new Uri("http://lorempixel.com/1920/1080/sports/7") };
            //  boboImage.Source = ImageSource.FromResource("MyApp.Images.love.jpeg");
            //  btn.ImageSource = (FileImageSource)ImageSource.FromFile(OnPlatForm("Images.clock", "ball", "Images/clock.png"));

        private void next_Pressed(object sender, EventArgs e)
        {
  if (index+1 < imagesUri.Length)
            {
                index++;
                 imageSource.Uri = new Uri(imagesUri[index]);
                imagefile = ImageSource.FromFile(images[index]);
                backImages.Source = imageSource;
            }
        }

        private void back_Pressed(object sender, EventArgs e)
        {
  if (index > 0)
            {
                index--;
                 imageSource.Uri = new Uri(imagesUri[index]);
                imagefile = ImageSource.FromFile(images[index]);
                backImages.Source = imageSource;
            }
        }
    }
}