using System;
using CloudinaryDotNet.Actions;

namespace api.Interfaces;

public interface IFileUploadService
{
    Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
    Task<RawUploadResult> AddFileAsync(IFormFile file);
    Task<DeletionResult> DeletePhotoAsync(string publicId);
    Task<DeletionResult> DeleteFileAsync(string publicId);
}
