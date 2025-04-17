using System;
using CloudinaryDotNet.Actions;

namespace api.DTOs;

public class PaginationResultDto<T>
{
    public IEnumerable<T> Data { get; set; } = new List<T>();
    public int Page { get; set; }
    public int TotalPages { get; set; }
}
