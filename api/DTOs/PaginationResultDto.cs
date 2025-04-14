using System;
using CloudinaryDotNet.Actions;

namespace api.DTOs;

public class PaginationResultDto<T>
{
    public List<T> Data { get; set; } = new List<T>();
    public int Page { get; set; }
}
