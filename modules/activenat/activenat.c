#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(int argc, char * argv) {
	
	setuid(0);
	clearenv();

	printf("Content-type: text/plain\n\n");
	fflush(stdout);
	
	system("/usr/bin/netstat-nat -n -o | /usr/bin/awk '{print $2}' | /usr/bin/cut -f 1 -d ':' | /usr/bin/sort | /usr/bin/uniq");
	fflush(stdout);

	return 0;
}
