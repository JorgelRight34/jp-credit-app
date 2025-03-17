using System;
using api.Data;
using api.DTOs.AdjustmentNote;
using api.Interfaces;
using api.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class AdjustmentNotesRepository(ApplicationDbContext context, IMapper mapper) : IAdjustmentNotesRepository
{
    public async Task<AdjustmentNoteDto> CreateAsync(CreateAdjustmentNoteDto createAdjustmentNoteDto)
    {
        var note = mapper.Map<AdjustmentNote>(createAdjustmentNoteDto);
        await context.AdjustmentNotes.AddAsync(note);
        await context.SaveChangesAsync();

        return mapper.Map<AdjustmentNoteDto>(note);
    }

    public async Task<AdjustmentNoteDto?> DeleteAsync(int id)
    {
        var note = await context.AdjustmentNotes.FindAsync(id);
        if (note == null) return null;

        context.AdjustmentNotes.Remove(note);
        await context.SaveChangesAsync();

        return mapper.Map<AdjustmentNoteDto>(note);
    }

    public async Task<IEnumerable<AdjustmentNoteDto>> GetAllAsync(AdjustmentNoteQuery query)
    {
        var notes = context.AdjustmentNotes
        .ProjectTo<AdjustmentNoteDto>(mapper.ConfigurationProvider)
        .AsQueryable();

        if (query.MinValue > query.MaxValue) throw new Exception("Min value can't be greater than max value");
        if (query.MinValue > 0)
        {
            notes = notes.Where(x => x.Amount >= query.MinValue);
        }
        if (query.MaxValue > 0)
        {
            notes = notes.Where(x => x.Amount <= query.MaxValue);
        }

        var page = query.Page - 1 < 0 ? 0 : query.Page - 1;
        notes = notes.Skip(page * query.Limit).Take(query.Limit);
        var response = await notes.ToListAsync();

        return response;
    }

    public async Task<AdjustmentNoteDto?> GetByIdAsync(int id)
    {
        var note = await context.AdjustmentNotes.FindAsync(id);
        if (note == null) return null;

        return mapper.Map<AdjustmentNoteDto>(note);
    }

    public async Task<AdjustmentNoteDto?> UpdateAsync(UpdateAdjustmentNoteDto updateAdjustmentNoteDto, int id)
    {
        var note = await context.AdjustmentNotes.FindAsync(id);
        if (note == null) return null;

        mapper.Map(updateAdjustmentNoteDto, note);

        await context.SaveChangesAsync();
        return mapper.Map<AdjustmentNoteDto>(note);
    }
}
