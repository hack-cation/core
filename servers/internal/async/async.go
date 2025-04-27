package async

import (
	"fmt"
	"golang.org/x/sync/errgroup"
	"sync"
)

func WithCallback(errFn func(error), fn func()) {
	go func() {
		defer func() {
			if err := recover(); err != nil {
				errFn(fmt.Errorf("error in goroutine: %s", err))
			}
		}()

		fn()
	}()
}

func WithErrCh(errCh chan<- error, fn func()) {
	go func() {
		defer func() {
			if err := recover(); err != nil {
				errCh <- fmt.Errorf("error in goroutine: %s", err)
			}
		}()

		fn()
	}()
}

func WgWithCallback(wg *sync.WaitGroup, errFn func(error), fn func()) {
	wg.Add(1)
	go func() {
		defer func() {
			if err := recover(); err != nil {
				errFn(fmt.Errorf("error in goroutine: %s", err))
			}
		}()

		fn()
		wg.Done()
	}()
}

func ErrGroup(eg *errgroup.Group, fn func() error) {
	eg.Go(func() (err error) {
		defer func() {
			if e := recover(); e != nil {
				err = fmt.Errorf("error in goroutine: %s", e)
			}
		}()
		err = fn()
		if err != nil {
			return err
		}
		return err
	})
}
