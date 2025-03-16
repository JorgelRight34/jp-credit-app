using System;
using api.DTOs.Collateral;


namespace api.Interfaces;

public interface ICollateralsRepository
{
    public Task<CollateralDto> CreateAsync(CreateCollateralDto createCollateralDto);
    public Task<IEnumerable<CollateralDto>> GetAllAsync(CollateralQuery collateralQuery);
    public Task<CollateralDto?> GetByIdAsync(int id);
    public Task<CollateralDto?> UpdateAsync(UpdateCollateralDto updateCollateralDto, int id);
    public Task<CollateralDto?> DeleteAsync(int id);
}
