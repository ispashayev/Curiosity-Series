! Computes a set of prime numbers

! TODO: a subroutine for generating primes

program sieveOfEratosthenes
  implicit None

  ! Type declarations
  ! TODO: Uncomment
  ! integer, dimension (1000) :: primes ! storage for 1000 primes
  ! integer :: num_primes_found = 0

  logical, dimension (:), allocatable :: sieve ! a dynamic array for the sieve of eratosthenes
  ! TODO: Change chunk_size back to 1000
  integer :: i = 1, j, base_prime = 2
  integer :: chunk_size = 10000, end

  
  ! Allocate the array and set the upper bound
  allocate(sieve(chunk_size))
  end = chunk_size
  sieve (i:end) = .TRUE.
  sieve(i) = .FALSE. ! 1 is not a prime number

  print *, "Results of the Sieve of Eratosthenes algorithm"
  print *, "=============================================="
  print *, "Upper bound:", chunk_size
  print *, ""

  ! Initialize the allocatable array to true
  do 10 j = base_prime, end
  	if (sieve(j)) then
  		print *, "Detected prime number:", j
  		sieve(2*j:end:j) = .FALSE.
  	end if
  10 continue

  deallocate(sieve)

end program sieveOfEratosthenes