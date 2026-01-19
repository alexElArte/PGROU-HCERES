package org.centrale.hceres.service.stat;

import org.centrale.hceres.dto.stat.book.BookStatDto;
import org.centrale.hceres.items.Activity;
import org.springframework.stereotype.Service;

@Service
public class BookStatService {

    public BookStatDto createStatBook(Activity activity) {
        BookStatDto bookStatDto = new BookStatDto();
        bookStatDto.fillDataFromActivity(activity);
        return bookStatDto;
    }
}
