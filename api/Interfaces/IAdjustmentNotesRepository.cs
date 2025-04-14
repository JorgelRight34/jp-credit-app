using System;
using api.DTOs.AdjustmentNote;
using api.Models;

namespace api.Interfaces;

public interface IAdjustmentNotesRepository
{
    public Task<AdjustmentNote> CreateAsync(CreateAdjustmentNoteDto createAdjustmentNoteDto);
    public Task<AdjustmentNote?> DeleteAsync(int id);
    public Task<IEnumerable<AdjustmentNote>> GetAllAsync(AdjustmentNoteQuery query);
    public Task<AdjustmentNote?> GetByIdAsync(int id);
    public Task<AdjustmentNote?> UpdateAsync(UpdateAdjustmentNoteDto updateAdjustmentNoteDto, int id);
}
