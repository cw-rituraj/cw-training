using Microsoft.AspNetCore.Mvc;
using product_api.Models;

namespace product_api.Controllers;

[ApiController]
[Route("/products")]
public class ProductController : Controller
{
    private readonly ILogger<ProductController> _logger;
    private readonly ProductDataModel _product = null;


    public ProductController(ILogger<ProductController> logger)
    {
        _logger = logger;
        _product = new ProductDataModel();

    }

    public ProductDataModel getAllProducts()
    {
        string sql = "select * from item";
        string connectionstring = "Server=127.0.0.1;Port=3306;database=product;user id=root;password=root@123;";
        // var res =  await _product.getApiData(cn);
        return _product.getData(sql, connectionstring);
    }

    [Route("/filter")]
    public ProductDataModel getFilterdProduct([FromQuery(Name = "brand")] string brand = "",
                                    [FromQuery(Name = "category")] string category = "",
                                    [FromQuery(Name = "minprice")] int minprice = 0, [FromQuery(Name = "maxprice")] int maxprice = 10000, [FromQuery(Name = "page")] int page = 1)
    {
        string connectionstring = "Server=127.0.0.1;Port=3306;database=product;user id=root;password=root@123;";
        // var res =  await _product.getApiData(cn);
        return _product.FilterData(brand,category,minprice,maxprice,page-1);
    }


    [Route("/page")]
    public ProductDataModel getPaginatedData(int page)
    {
        page = page - 1;
        string sql = $"select * from item LIMIT {page * 10},10;";
        string connectionstring = "Server=127.0.0.1;Port=3306;database=product;user id=root;password=root@123;";
        return _product.getPaginatedData(sql, connectionstring);
    }
}
