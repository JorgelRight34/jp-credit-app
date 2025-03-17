using System;
using api.DTOs.AdjustmentNote;

namespace api.Interfaces;

public interface IAdjustmentNotesRepository
{
    public Task<AdjustmentNoteDto> CreateAsync(CreateAdjustmentNoteDto createAdjustmentNoteDto);
    public Task<AdjustmentNoteDto?> DeleteAsync(int id);
    public Task<IEnumerable<AdjustmentNoteDto>> GetAllAsync(AdjustmentNoteQuery query);
    public Task<AdjustmentNoteDto?> GetByIdAsync(int id);
    public Task<AdjustmentNoteDto?> UpdateAsync(UpdateAdjustmentNoteDto updateAdjustmentNoteDto, int id);
}
