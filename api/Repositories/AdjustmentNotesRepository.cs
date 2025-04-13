using System;
using api.Data;
using api.DTOs.AdjustmentNote;
using api.Extensions;
using api.Interfaces;
using api.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class AdjustmentNotesRepository(
    ApplicationDbContext context,
    IMapper mapper
) : IAdjustmentNotesRepository
{
    public async Task<AdjustmentNote> CreateAsync(CreateAdjustmentNoteDto createAdjustmentNoteDto)
    {
        var note = mapper.Map<AdjustmentNote>(createAdjustmentNoteDto);
        await context.AdjustmentNotes.AddAsync(note);
        await context.SaveChangesAsync();

        return note;
    }

    public async Task<AdjustmentNote?> DeleteAsync(int id)
    {
        var note = await context.AdjustmentNotes.FindAsync(id);
        if (note == null) return null;

        context.AdjustmentNotes.Remove(note);
        await context.SaveChangesAsync();

        return note;
    }

    public async Task<IEnumerable<AdjustmentNote>> GetAllAsync(AdjustmentNoteQuery query)
    {
        var notes = context.AdjustmentNotes.AsQueryable();

        if (query.MinValue > query.MaxValue) throw new Exception(
            "Min value can't be greater than max value"
        );
        if (query.MinValue > 0)
        {
            notes = notes.Where(x => x.Amount >= query.MinValue);
        }
        if (query.MaxValue > 0)
        {
            notes = notes.Where(x => x.Amount <= query.MaxValue);
        }

        if (query.LoanId > 0)
        {
            notes = notes.Where(x => x.LoanId == query.LoanId);
        }

        if (query.NoteId > 0)
        {
            notes = notes.Where(x => x.Id == query.NoteId);
        }

        return await notes.PaginateAsync(query);
    }

    public async Task<AdjustmentNote?> GetByIdAsync(int id)
    {
        var note = await context.AdjustmentNotes.Include(x => x.Loan).FirstOrDefaultAsync(x => x.Id == id);
        if (note == null) return null;

        return note;
    }

    public async Task<AdjustmentNote?> UpdateAsync(
        UpdateAdjustmentNoteDto updateAdjustmentNoteDto, int id
    )
    {
        var note = await context.AdjustmentNotes.FindAsync(id);
        if (note == null) return null;

        mapper.Map(updateAdjustmentNoteDto, note);

        await context.SaveChangesAsync();
        return note;
    }
}
