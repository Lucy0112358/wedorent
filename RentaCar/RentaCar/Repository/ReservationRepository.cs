using Dapper;
using Npgsql;
using RentaCar.Configuration;
using RentaCar.Entity;

namespace RentaCar.Repository
{
    public class ReservationRepository : BaseRepository
    {
        private readonly NpgsqlConnection _dbConnection;

        public ReservationRepository(NpgsqlConnection dbConnection, ISanitizer sanitizer)
            : base(dbConnection, sanitizer)
        {
        }

        /// <summary>
        /// Gets all reservations.
        /// </summary>
        public IEnumerable<Services> GetAllServices()
        {
            return GetAll<Services>().ToList();
        }

        public IEnumerable<Reservation> GetReservationsForDateRange(DateTime startDate, DateTime endDate)
        {
            var sql = @"
        SELECT * FROM Reservation
        WHERE StartDate < @EndDate
          AND EndDate > @StartDate";

            return _dbConnection.Query<Reservation>(sql, new { StartDate = startDate, EndDate = endDate });
        }

    }
}
