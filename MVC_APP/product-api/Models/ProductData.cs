using System.Collections.Generic;
using System;
using System.Linq;
using System.Text;
using System.Data;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using Dapper;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;


namespace product_api.Models;

public class ProductDataModel
{
    public List<ProductModel> products { get; set; }
    public int Total { get; set; }
    public int Skip { get; set; }
    public int Limit { get; set; }


    public ProductDataModel getData(string sql, string connectionString)
    {
        using (IDbConnection connection = new MySqlConnection(connectionString))
        {
            List<ProductModel> rows = connection.Query<ProductModel>(sql).ToList();
            Console.WriteLine(rows);
            this.products = rows;
            this.Total = 100;
            this.Skip = 0;
            this.Limit = 10;
            return this;
        }
    }
     public ProductDataModel getPaginatedData (string sql, string connectionString)
    {
        using (IDbConnection connection = new MySqlConnection(connectionString))
        {
            List<ProductModel> rows = connection.Query<ProductModel>(sql).ToList();
            Console.WriteLine(rows);
            GetImages(rows);
            this.products = rows;
            this.Total = connection.Query<int>("SELECT * FROM item ;").Count();
            this.Skip = 0;
            this.Limit = 10;
            return this;
        }
    }

    public void GetImages(List<ProductModel> rows ){
            string connectionString = "Server=127.0.0.1;Port=3306;database=product;user id=root;password=root@123;";

            foreach(var items in rows){
             using (IDbConnection connection = new MySqlConnection(connectionString))
        {
            connection.Open();
            string query = $"SELECT image0,image1,image2,image3,image4,image5 FROM images where id = {items.Id} ;";
            dynamic imageData = connection.Query<dynamic>(query).ToArray();;
            items.Images = imageData;
        }
    }
}

    public ProductDataModel FilterData(string brand , string category ,int minprice ,int maxprice , int page )
    {
        string filterQuery = "WHERE ";
        string nullString = "null";
                    //    Console.WriteLine(category+"hi");

        if (string.Compare(brand,nullString) != 0){
            filterQuery = filterQuery + $"brand IN ({brand}) ";
            if (string.Compare(category,nullString) != 0){
            filterQuery = filterQuery + $"AND category IN ({category}) ";
            }
           if(minprice >= 0 && maxprice > 0){
            filterQuery = filterQuery + $"AND price > {minprice} AND price < {maxprice}";
            }
            }
        else if (string.Compare(category,nullString) != 0){
            filterQuery = filterQuery + $"category IN ({category}) ";
            if(minprice >= 0 && maxprice > 0)
            filterQuery = filterQuery + $"AND price > {minprice} AND price < {maxprice}";
            }
       else if(minprice >= 0 && maxprice > 0)
            filterQuery = filterQuery + $"price >= {minprice} AND price <= {maxprice}";
       else filterQuery = "";

       Console.WriteLine(filterQuery);
        string connectionString = "Server=127.0.0.1;Port=3306;database=product;user id=root;password=root@123;";

        using (IDbConnection connection = new MySqlConnection(connectionString))
        {
            connection.Open();
            string CountQuery = $"SELECT * FROM item {filterQuery} ;";
            string query = $"SELECT * FROM item {filterQuery} LIMIT {page*10},10;";
            List<ProductModel> rows = connection.Query<ProductModel>(query).ToList();
            Console.WriteLine("successfull");
            GetImages(rows);

            this.products = rows;
            this.Total =  connection.Query<int>(CountQuery).Count();
            this.Skip = 0;
            this.Limit = 10;
            return this;
        }

    }

    // public async Task<ProductDataModel> getApiData(string connectionString){
    //     HttpClient ApiClient  = new HttpClient();
    //   ApiClient.DefaultRequestHeaders.Accept.Clear();
    //   ApiClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    //     string url = "https://dummyjson.com/products";

    //      HttpResponseMessage response = await ApiClient.GetAsync(url) ;
    //           // if(response.IsSuccessStatusCode){
    //             var responseBody = await response.Content.ReadAsStringAsync();
    //               var result = JsonConvert.DeserializeObject<ProductDataModel>(responseBody);
    //             Console.WriteLine($"{result.products}");

    //              SaveData(result.products,connectionString);
    //            return result;
    //         //}
    // }


    // public void SaveData(List<ProductModel> parameters,string connectionString){

    // using(IDbConnection connection = new MySqlConnection(connectionString)){
    //     connection.Open();
    //     string query = "INSERT INTO item(id,title,description,price,discountPercentage,rating,stock,brand,category,thumbnail) VALUES(@Id,@Title,@Description,@Price,@DiscountPercentage,@Rating, @Stock,@Brand,@Category,@Thumbnail);";
    //      connection.Execute(query,parameters);
    //      Console.WriteLine("successfull");
    //          }

    // }


}
