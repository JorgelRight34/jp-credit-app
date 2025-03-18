using System;
using api.DTOs;
using Microsoft.EntityFrameworkCore;

namespace api.Extensions;

public static class QueryableExtension
{
    public static async Task<List<T>> PaginateAsync<T>(this IQueryable<T> query, Query queryParams)
    {
        var page = queryParams.Page - 1 < 0 ? 0 : queryParams.Page - 1;
        query = query.Skip(page * queryParams.Limit).Take(queryParams.Limit);

        return await query.ToListAsync();
    }
}
