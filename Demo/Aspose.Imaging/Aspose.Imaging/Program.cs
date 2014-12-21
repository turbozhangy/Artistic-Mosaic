using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aspose.Imaging;
using System.IO;
using Aspose.Imaging.Shapes;
using System.Diagnostics;
namespace DrawingUsingGraphicsPath
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Stopwatch myWatch = Stopwatch.StartNew();
            // The path to the documents directory.
            string dataDir = Path.GetFullPath("F:/Image/");
            //Create an instance of BmpCreateOptions and set its various properties
            Aspose.Imaging.ImageOptions.BmpOptions ImageOptions = new Aspose.Imaging.ImageOptions.BmpOptions();
            ImageOptions.BitsPerPixel = 24;

            //Create an instance of FileCreateSource and assign it to Source property
            ImageOptions.Source = new Aspose.Imaging.Sources.FileCreateSource(dataDir + "sample5000.jpg", false);

            Image[] images = new Image[100];
            for (int k = 1; k <= 100; k++)
            {
                images[k - 1] = Image.Load(dataDir + "tmp/1 (" + k + ").jpg");
                //  graphics.DrawImage(tmpImage, i * 50, j * 50, 50, 50);
                //  tmpImage.Dispose();
                Console.WriteLine(string.Format("{0}已完成", k));
                //  k++;
            }

            //Create an instance of Image 
            using (Aspose.Imaging.Image image = Aspose.Imaging.Image.Create(ImageOptions, 5000, 5000))
            {
                //Create and initialize an instance of Graphics
                Aspose.Imaging.Graphics graphics = new Aspose.Imaging.Graphics(image);

                //Clear the image surface with white color
                // graphics.Clear(Aspose.Imaging.Color.White);

                //var tmpImage = Image.Load(dataDir + "1.jpg");
                // int k = 1;

                var l = 0;
                for (int i = 0; i < 10; i++)
                {
                    for (int j = 0; j < 10; j++)
                    {
                        if (l == 101)
                        {
                            l = 0;
                        }
                        Stopwatch tmpWatch = Stopwatch.StartNew();
                        graphics.DrawImage(images[l], i * 500, j * 500, 500, 500);
                        tmpWatch.Stop();

                        Console.WriteLine(string.Format("{0},{1}已完成,用时{2}", i, j, tmpWatch.ElapsedMilliseconds));
                        l++;
                    }
                }

                //for (int i = 0; i < 10; i++)
                //{
                //    for (int j = 0; j < 10; j++)
                //    {
                //        if (k == 101)
                //        {
                //            k = 1;
                //        }
                //        var tmpImage = Image.Load(dataDir + "tmp/1 (" + k + ").jpg");
                //        graphics.DrawImage(tmpImage, i * 50, j * 50, 50, 50);
                //        tmpImage.Dispose();
                //        Console.WriteLine(string.Format("{0},{1}已完成", i, j));
                //        k++;
                //    }
                //}

                //graphics.DrawImage(tmpImage, 50, 0, 50, 50);
                //  tmpImage.Dispose();
                image.Save();

                ////Create an instance of GraphicsPath
                //Aspose.Imaging.GraphicsPath graphicspath = new Aspose.Imaging.GraphicsPath();

                ////Create an instance of Figure
                //Aspose.Imaging.Figure figure = new Aspose.Imaging.Figure();

                ////Add EllipseShape to the figure by defining boundary Rectangle
                //figure.AddShape(new EllipseShape(new RectangleF(0, 0, 499, 499)));

                ////Add RectangleShape to the figure
                //figure.AddShape(new RectangleShape(new RectangleF(0, 0, 499, 499)));

                ////Add TextShape to the figure by defining the boundary Rectangle and Font
                //figure.AddShape(new TextShape("Aspose.Imaging", new RectangleF(170, 225, 170, 100), new Font("Arial", 20), StringFormat.GenericTypographic));

                ////Add figures to the GraphicsPath object
                //graphicspath.AddFigures(new Aspose.Imaging.Figure[] { figure });

                ////Draw Path
                //graphics.DrawPath(new Aspose.Imaging.Pen(Aspose.Imaging.Color.Blue), graphicspath);

                ////Create an instance of HatchBrush and set its properties
                //Aspose.Imaging.Brushes.HatchBrush hatchbrush = new Aspose.Imaging.Brushes.HatchBrush();
                //hatchbrush.BackgroundColor = Aspose.Imaging.Color.Brown;
                //hatchbrush.ForegroundColor = Color.Blue;
                //hatchbrush.HatchStyle = HatchStyle.Vertical;

                ////Fill path by supplying the brush and GraphicsPath objects
                //graphics.FillPath(hatchbrush, graphicspath);

                ////Create an instance of PsdOptions and set it?s various properties
                //Aspose.Imaging.ImageOptions.PsdOptions psdOptions = new Aspose.Imaging.ImageOptions.PsdOptions();
                //psdOptions.ColorMode = Aspose.Imaging.FileFormats.Psd.ColorModes.RGB;
                //psdOptions.CompressionMethod = Aspose.Imaging.FileFormats.Psd.CompressionMethod.RLE;
                //psdOptions.Version = 4;

                ////Save image to disk in PSD format
                //image.Save(dataDir + "output.psd", psdOptions);

                // Save the changes.
                //image.Save();

                // Display Status.
                myWatch.Stop();
                System.Console.WriteLine("Processing completed successfully." + myWatch.ElapsedMilliseconds.ToString());
            }
        }
    }
}