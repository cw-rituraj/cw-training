public class Startup
{
    string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

    public IConfiguration configRoot
    {
        get;
    }
    public Startup(IConfiguration configuration)
    {
        configRoot = configuration;
    }
    public void ConfigureServices(IServiceCollection services)
    {

        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddCors(options =>
        {
            options.AddPolicy(name: MyAllowSpecificOrigins,
                              policy =>
                              {
                                  policy.WithOrigins("http://localhost:3000");
                              });
        });

    }
    public void Configure(WebApplication app, IWebHostEnvironment env)
    {
       
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
        app.UseHttpsRedirection();
        app.UseCors(MyAllowSpecificOrigins);
        app.UseAuthorization();
        app.Run();
    }
}