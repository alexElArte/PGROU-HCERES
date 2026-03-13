package org.centrale.hceres.service.stat;

import org.centrale.hceres.dto.stat.items.NetworkStatItemDto;
import org.centrale.hceres.dto.stat.utils.ActivityStatDto;
import org.centrale.hceres.dto.stat.utils.ActivityStatSumDto;
import org.centrale.hceres.items.Activity;
import org.springframework.stereotype.Service;

@Service
public class NetworkStatService {

    public ActivityStatDto createStatNetwork(Activity activity) {
        NetworkStatItemDto dto = new NetworkStatItemDto();
        dto.fillDataFromActivity(activity);
        return dto;
    }

    public ActivityStatSumDto createStatSumNetwork() {
        return new ActivityStatSumDto();
    }
}
