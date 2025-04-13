using System;
using api.DTOs;
using api.DTOs.Collateral;
using api.Models;


namespace api.Interfaces;

public interface ICollateralsRepository
{

    Task<Collateral> AddCollateralPhotoAsync(IFormFile file, Collateral collateral);
    Task<Collateral> CreateAsync(CreateCollateralDto createCollateralDto);
    Task<Collateral?> DeleteAsync(int id);
    Task DeleteCollateralPhotoAsync(string publicId);
    Task<IEnumerable<Collateral>> GetAllAsync(CollateralQuery collateralQuery);
    Task<Collateral?> GetByIdAsync(int id);
    Task<Collateral?> UpdateAsync(UpdateCollateralDto updateCollateralDto, int id);
}
