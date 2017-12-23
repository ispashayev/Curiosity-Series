! Computes a set of prime numbers

program sieveOfEratosthenes
  implicit none

  ! Type declarations
  integer, dimension (:), allocatable :: primes
  integer :: num_primes = 1000000, num_primes_found = 0

  logical, dimension (:), allocatable :: sieve ! a dynamic array for the sieve of eratosthenes
  integer :: i = 1, j, base_prime = 2
  integer :: chunk_size, error, end

  ! Approximate the chunk size for allocations using the Prime Number Theorem
  call pnt_approximation(num_primes, chunk_size)
  
  print *, "Chunk size set by subroutine:", chunk_size
  
  ! Allocate the array and set the upper bound
  allocate(primes(num_primes), stat=error)
  if (error .ne. 0) then
    print *, "Unable to allocate memory for primes array."
    stop
  end if

  allocate(sieve(chunk_size), stat=error)
  if (error .ne. 0) then
    print *, "Unable to allocate memory for sieve of Eratosthenes."
    stop
  end if

  end = chunk_size
  sieve(i:end) = .true. ! initialize all array elements to true
  sieve(i) = .false. ! 1 is not a prime number

  ! do 10
    do 20 j = base_prime, end
      if (sieve(j)) then
        num_primes_found = num_primes_found + 1
        primes(num_primes_found) = j
        sieve(2*j:end:j) = .false. ! TODO: offset the beginning of this by the number of chunks that have been allocated
        if (num_primes_found == num_primes) then
          exit
        end if
      end if
    20 continue
    ! TODO: Allocate more memory here
  ! 10 continue

  do 30 j = 1, num_primes_found
    print *, primes(j)
  30 continue

  print *, ""
  print *, "Total number of primes found:", num_primes_found

  deallocate(sieve)

end program sieveOfEratosthenes

! The following subroutine approximates an interval size  for containing
! NUM_PRIMES primes. The approximation is stored in INTERVAL_SIZE. The
! algorithm used for approximation is Newton's Method to solve the equation
! given by the Prime Number Theorem, i.e. the number of primes in the interval
! [0,x] is approximately x / ln(x) We set this value equal to NUM_PRIMES and
! solve for x, where x is equivalent to INTERVAL_SIZE. 
subroutine pnt_approximation(num_primes, interval_size)
  implicit none

  integer, intent(in) :: num_primes
  integer, intent(out) :: interval_size

  integer :: i
  real :: xt, prime_count_approx, dprime_count_approx

  xt = num_primes

  print *, "Approximating the interval size for", num_primes, "primes..."

  do 30 i = 0, 50
    prime_count_approx = xt / log(xt) - num_primes
    dprime_count_approx = (log(xt) - 1.0) / log(xt)**2
    xt = xt - prime_count_approx / dprime_count_approx
  30 continue

  print *, "Done."
  print *, ""

  interval_size = xt

end subroutine pnt_approximation
