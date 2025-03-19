using System;
using api.DTOs;
using api.DTOs.Collateral;
using api.Models;


namespace api.Interfaces;

public interface ICollateralsRepository
{

    Task<CollateralDto> AddCollateralPhotoAsync(IFormFile file, Collateral collateral);
    Task<CollateralDto> CreateAsync(CreateCollateralDto createCollateralDto);
    Task<CollateralDto?> DeleteAsync(int id);
    Task DeleteCollateralPhotoAsync(string publicId);
    Task<IEnumerable<CollateralDto>> GetAllAsync(CollateralQuery collateralQuery);
    Task<CollateralDto?> GetByIdAsync(int id);
    Task<CollateralDto?> UpdateAsync(UpdateCollateralDto updateCollateralDto, int id);
}
