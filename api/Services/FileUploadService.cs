using System;
using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace api.Services;

public class FileUploadService : IFileUploadService
{
    private readonly Cloudinary _cloudinary;
    private readonly ApplicationDbContext _context;
    private string CloudFolderName { get; set; } = "jp-credit-app";
    public FileUploadService(IOptions<CloudinarySettings> config, ApplicationDbContext context)
    {
        var account = new Account(
            config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret
        );

        _cloudinary = new Cloudinary(account);
        _context = context;
    }

    /// <summary>
    /// Uploads a file to Cloudinary and returns the upload result.
    /// </summary>
    /// <param name="file"></param>
    /// <exception cref="Exception">Thrown if the file upload fails.</exception>
    /// <remarks>Uses the Cloudinary API to upload the file.</remarks>
    /// <returns>UploadResult object containing the result of the upload.</returns>
    public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
    {
        var uploadResult = new ImageUploadResult();

        if (file.Length > 0)
        {
            using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Folder = CloudFolderName
            };

            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

        return uploadResult;
    }

    public async Task<RawUploadResult> AddFileAsync(IFormFile file)
    {
        var uploadResult = new RawUploadResult();

        if (file.Length > 0)
        {
            using var stream = file.OpenReadStream();
            var uploadParams = new RawUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Folder = CloudFolderName,
                PublicId = Path.GetFileNameWithoutExtension(file.FileName),
            };
            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        } else {
            throw new Exception("File is empty");
        }

        return uploadResult;
    }

    public async Task<DeletionResult> DeletePhotoAsync(string publicId)
    {
        var deleteParams = new DeletionParams($"jp-credit-app/{publicId}");
        var result = await _cloudinary.DestroyAsync(deleteParams);

        // Delete photo from the database if result is successful
        if (result.Result == "ok")
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(x => x.PublicId == publicId);
            if (photo != null)
            {
                _context.Photos.Remove(photo);
                await _context.SaveChangesAsync();
            }
        }

        return result;
    }

    public async Task<DeletionResult> DeleteFileAsync(string publicId)
    {
        var deleteParams = new DeletionParams($"jp-credit-app/{publicId}");
        var result = await _cloudinary.DestroyAsync(deleteParams);

        // Delete photo from the database if result is successful
        if (result.Result == "ok")
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(x => x.PublicId == publicId);
            if (photo != null)
            {
                _context.Photos.Remove(photo);
                await _context.SaveChangesAsync();
            }
        }

        return result;
    }
}
