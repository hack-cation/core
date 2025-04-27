package api

import (
	"fmt"
	"net/http"
	"strconv"
	"time"
)

func formatDuration(d time.Duration) string {
	return fmt.Sprintf("%.0f", d.Seconds())
}

func CachingHeaders(maxAge, staleWhileRevalidate time.Duration, private bool, headers http.Header) {
	m := fmt.Sprintf("max-age=%s", formatDuration(maxAge))
	s := fmt.Sprintf("stale-while-revalidate=%s", formatDuration(staleWhileRevalidate))

	if private {
		headers.Set("Cache-Control", "private")
	}
	headers.Set("Cache-Control", m)
	headers.Set("Cache-Control", s)

	// Expires header for backwards compatability
	expires := time.Now().Add(maxAge).Format(http.TimeFormat)
	headers.Set("Expires", expires)
}

const (
	ExpectedVersionHeader = "X-Expected-Version"
)

func CheckExpectedVersion(r *http.Request) (int, error) {
	expectedVersionH := r.Header.Get(ExpectedVersionHeader)
	if expectedVersionH == "" {
		return 0, nil
	}

	eVersion, err := strconv.Atoi(expectedVersionH)
	if err != nil {
		return 0, err
	}

	return eVersion, nil
}
