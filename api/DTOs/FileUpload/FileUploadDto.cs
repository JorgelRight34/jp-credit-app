using System;

namespace api.DTOs.FileUpload;

public class FileUploadDto
{
    public int Id { get; set; }
    public string? Url { get; set;}
    public string? PublicId { get; set; }
    public string? FileType { get; set; }
    public int CollateralId { get; set; }
    
    public string? Name { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? LastModified { get; set; }

}
